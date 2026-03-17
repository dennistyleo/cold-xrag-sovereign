class UPASLEngine {
    constructor(bus) {
        this.bus = bus;
        this.registry = this.initRegistry();
        this.bus.subscribe(this);
    }
    initRegistry() {
        let ax = [];
        const domains = [
            {n:"LOGIC", r:[1,60]}, {n:"THERMAL", r:[61,150]}, 
            {n:"MECH", r:[151,240]}, {n:"ELEC", r:[241,330]}, {n:"SYS", r:[331,378]}
        ];
        for (let i = 1; i <= 378; i++) {
            let d = domains.find(dom => i >= dom.r[0] && i <= dom.r[1]);
            ax.push({
                id: "XRAG-" + String(i).padStart(4, '0'),
                label: (i === 375) ? "CARNOT_LIMIT" : d.n + "_AXIOM",
                formula: (i === 375) ? "\\eta \\le 1 - T_C/T_H" : "\\Delta S \\ge 0",
                chart: (i === 375) ? "WORLD" : (i <= 60 ? "GNN" : "WORLD")
            });
        }
        return ax;
    }
    onFrame(frame) {
        if (frame.header.opCode === "NASA_IMS_INGEST") {
            const limit = frame.payload.sigma > 0.85 ? 0 : 1;
            this.bus.publish(this.bus.createFrame("UPASL", "UPASL_COMMIT", { fraction: limit }));
        }
    }
}
