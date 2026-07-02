/**
 * Minimal in-memory mock of the parts of `hass` that the card uses.
 *
 * Supports:
 *   - hass.callWS({ type: "todo/item/list", entity_id })
 *   - hass.connection.subscribeMessage(cb, { type: "todo/item/subscribe", entity_id })
 *   - hass.callService("todo", "add_item" | "update_item" | "remove_item", ...)
 */

const STARTER_ITEMS = [
  { uid: "1", summary: "Bananas", status: "needs_action" },
  { uid: "2", summary: "Olive oil", status: "needs_action" },
  { uid: "3", summary: "Bread", status: "needs_action" },
  { uid: "4", summary: "Coffee beans", status: "completed" },
];

export function createMockHass({
  entityId = "todo.shopping_list",
  initialItems = STARTER_ITEMS,
} = {}) {
  const state = {
    items: initialItems.map((i) => ({ ...i })),
    subs: new Set(),
    log: [],
  };

  const log = (...args) => {
    state.log.push(args);
    console.log("[mock-hass]", ...args);
  };

  const fireSubs = () => {
    const snapshot = { items: state.items.map((i) => ({ ...i })) };
    state.subs.forEach((cb) => {
      try {
        cb(snapshot);
      } catch (err) {
        console.error("[mock-hass] subscriber threw:", err);
      }
    });
  };

  const nextUid = () => String(Date.now() + Math.floor(Math.random() * 1000));

  const services = {
    todo: {
      add_item: ({ item }) => {
        state.items.push({ uid: nextUid(), summary: item, status: "needs_action" });
      },
      update_item: ({ item, status, rename }) => {
        const found = state.items.find((i) => i.uid === item || i.summary === item);
        if (!found) return;
        if (status) found.status = status;
        if (rename) found.summary = rename;
      },
      remove_item: ({ item }) => {
        state.items = state.items.filter((i) => i.uid !== item && i.summary !== item);
      },
    },
  };

  const hass = {
    states: {
      [entityId]: {
        entity_id: entityId,
        state: String(state.items.filter((i) => i.status !== "completed").length),
        attributes: { friendly_name: "Shopping List", icon: "mdi:cart" },
      },
    },
    language: "en",
    locale: { language: "en", number_format: "comma_decimal" },
    themes: { darkMode: true },

    async callWS(msg) {
      log("callWS", msg);
      if (msg.type === "todo/item/list") {
        return { items: state.items.map((i) => ({ ...i })) };
      }
      throw new Error(`mock-hass: unhandled WS type "${msg.type}"`);
    },

    async callService(domain, service, data) {
      log("callService", `${domain}.${service}`, data);
      const handler = services[domain]?.[service];
      if (!handler) throw new Error(`mock-hass: unhandled service ${domain}.${service}`);
      handler(data || {});
      fireSubs();
    },

    connection: {
      _eventTarget: new EventTarget(),
      _connected: true,
      get connected() {
        return this._connected;
      },
      addEventListener(event, handler) {
        this._eventTarget.addEventListener(event, handler);
      },
      removeEventListener(event, handler) {
        this._eventTarget.removeEventListener(event, handler);
      },
      async subscribeMessage(cb, msg) {
        log("subscribeMessage", msg);
        state.subs.add(cb);
        // Push an initial snapshot async so the card sees it.
        queueMicrotask(() => cb({ items: state.items.map((i) => ({ ...i })) }));
        return () => state.subs.delete(cb);
      },
    },
  };

  const mock = { hass, state };

  mock.setState = (status) => {
    state.items = state.items.map((i) => ({ ...i }));
  };

  return mock;
}
