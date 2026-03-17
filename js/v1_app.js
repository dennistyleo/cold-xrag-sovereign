class SovereignApp {
    constructor() {
        this.engine = new UPASLEngine(window.XR_BUS);
        if (typeof VisualEngine !== 'undefined') {
            this.visuals = new VisualEngine(window.XR_BUS);
        }
        this.mountAxioms();
        window.XR_BUS.subscribe(this);
    }
    
    mountAxioms() {
        const mount = document.getElementById('slot-axiom-registry');
        mount.innerHTML = `<div style="color:var(--primary); font-weight:900; font-size:14px; margin-bottom:20px; border-bottom:1px solid #333; padding-bottom:10px; letter-spacing: 2px;">375 AXIOM SUBSTRATE</div>`;

        // 建立三層結構的虛擬 DOM 容器
        const hierarchy = {
            "DOMAIN 01: LOGIC & MATH": { "TOPOLOGY": [], "CORE_LOGIC": [] },
            "DOMAIN 02: PHYSICS & MECH": { "THERMODYNAMICS": [], "CAUSAL_DYNAMICS": [] }
        };

        // 將註冊表中的公理按特徵分類 (Layer 2)
        const modes = ["CORE", "GNN", "WORLD", "CAUSAL"];
        this.engine.registry.forEach((ax, index) => {
            let d1 = "DOMAIN 02: PHYSICS & MECH", d2 = "CAUSAL_DYNAMICS";
            let lbl = (ax.label || "").toUpperCase();
            
            if (lbl.includes("LOGIC") || lbl.includes("MATH")) {
                d1 = "DOMAIN 01: LOGIC & MATH";
                d2 = lbl.includes("TOP") ? "TOPOLOGY" : "CORE_LOGIC";
                ax.chart = lbl.includes("TOP") ? "GNN" : "CORE";
            } else {
                d2 = lbl.includes("THERMAL") || lbl.includes("CARNOT") ? "THERMODYNAMICS" : "CAUSAL_DYNAMICS";
                ax.chart = d2 === "THERMODYNAMICS" ? "CAUSAL" : "WORLD";
            }
            
            // 如果上述邏輯失效，強制循環分配確保 4 個引擎都有展示
            if(!ax.chart) ax.chart = modes[index % 4];
            hierarchy[d1][d2].push(ax);
        });

        // 渲染三層結構到側邊欄
        for (const [domain, categories] of Object.entries(hierarchy)) {
            // Layer 1: Domain
            const dEl = document.createElement('div');
            dEl.innerHTML = `<div style="font-size:11px; color:var(--primary); margin:20px 0 10px; background:#0a0a0a; padding:6px; font-weight:bold; letter-spacing:1px;">[ ${domain} ]</div>`;
            mount.appendChild(dEl);

            for (const [category, axioms] of Object.entries(categories)) {
                if (axioms.length === 0) continue;
                
                // Layer 2: Category
                const cEl = document.createElement('div');
                cEl.innerHTML = `<div style="font-size:10px; color:#888; margin:10px 0 5px 10px; padding-left:5px; border-left:2px solid #333; letter-spacing:1px;">>> ${category}</div>`;
                const axContainer = document.createElement('div');
                axContainer.style.paddingLeft = "20px";
                
                // Layer 3: Axioms
                axioms.forEach(ax => {
                    const axEl = document.createElement('div');
                    axEl.className = 'axiom-item';
                    axEl.style.cssText = "padding:6px 10px; cursor:pointer; font-size:10px; font-family:monospace; color:#aaa; border-bottom:1px solid #111;";
                    if (ax.id === 'XRAG-0375') axEl.style.color = '#d4af37';
                    axEl.innerText = `${ax.id} :: ${ax.label} [${ax.chart}]`;
                    
                    axEl.onclick = () => {
                        document.querySelectorAll('.axiom-item').forEach(el => {
                            el.style.background = 'transparent'; el.style.color = el.innerText.includes('0375') ? '#d4af37' : '#aaa'; el.style.borderLeft = 'none';
                        });
                        axEl.style.color = '#fff'; axEl.style.background = 'rgba(0, 255, 136, 0.1)'; axEl.style.borderLeft = '3px solid var(--primary)';
                        window.XR_BUS.publish(window.XR_BUS.createFrame("UI", "AXIOM_ACTIVATE", ax));
                    };
                    axContainer.appendChild(axEl);
                });
                cEl.appendChild(axContainer);
                mount.appendChild(cEl);
            }
        }
    }
    
    onFrame(frame) {
        if (frame.header.opCode === "AXIOM_ACTIVATE") {
            const mathOverlay = document.getElementById('math-overlay');
            if (mathOverlay) {
                mathOverlay.innerHTML = "\\[ " + (frame.payload.formula || "\\text{Undefined}") + " \\]";
                if (window.MathJax) MathJax.typesetPromise();
            }
        }
    }
}
new SovereignApp();
