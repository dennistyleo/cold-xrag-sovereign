class XRBus {
    constructor() {
        this.subscribers = new Set();
        this.traceId = 0;
    }
    createFrame(moduleId, opCode, payload = {}) {
        return {
            header: { moduleId, boundaryId: "SOVEREIGN_V1", opCode },
            timing: { timestamp: performance.now(), clock_ref: "MASTER_FABRIC" },
            causal: { traceId: ++this.traceId, parentId: payload.parentId || null },
            payload: payload,
            integrity: { version: "V36", hash: Math.random().toString(16) }
        };
    }
    publish(frame) {
        this.subscribers.forEach(sub => sub.onFrame(frame));
    }
    subscribe(module) {
        this.subscribers.add(module);
    }
}
window.XR_BUS = new XRBus();
