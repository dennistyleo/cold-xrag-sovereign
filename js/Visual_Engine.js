class VisualEngine {
    constructor(bus) {
        this.bus = bus;
        this.canvas = document.getElementById('main-render');
        this.ctx = this.canvas.getContext('2d');
        this.mode = "WORLD"; this.sigma = 0.1;
        this.bus.subscribe(this);
        setTimeout(() => { this.resize(); this.animate(); }, 50);
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth || 800;
        this.canvas.height = this.canvas.parentElement.clientHeight || 600;
    }
    onFrame(frame) {
        if (frame.header.opCode === "AXIOM_ACTIVATE") this.mode = frame.payload.chart || "WORLD";
        if (frame.header.opCode === "NASA_IMS_INGEST") this.sigma = frame.payload.sigma;
    }
    animate() {
        this.ctx.fillStyle = 'rgba(0,0,0,0.15)';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        
        if (this.mode === "WORLD") this.drawLorenz();
        else if (this.mode === "CAUSAL") this.drawMatrix();
        else if (this.mode === "GNN") this.drawGNN();
        else if (this.mode === "CORE") this.drawCore(); // 恢復 CORE 模式
        
        requestAnimationFrame(() => this.animate());
    }
    drawLorenz() {
        let x=0.1, y=0, z=0, dt=0.01, s=10+(this.sigma*20);
        this.ctx.strokeStyle = '#00ff88'; this.ctx.lineWidth = 1.5; this.ctx.beginPath();
        for(let i=0; i<5000; i++) {
            let dx=s*(y-x)*dt, dy=(x*(28-z)-y)*dt, dz=(x*y-(8/3)*z)*dt;
            x+=dx; y+=dy; z+=dz;
            this.ctx.lineTo(this.canvas.width/2 + x*15, this.canvas.height/2 + y*15); // *15 物理比例
        }
        this.ctx.stroke();
    }
    drawMatrix() {
        const sX=this.canvas.width/2-200, sY=this.canvas.height/2-200;
        for(let i=0; i<10; i++) {
            for(let j=0; j<10; j++) {
                this.ctx.fillStyle = Math.random()>0.8?'#00ff88':'rgba(0,255,136,0.1)';
                this.ctx.fillRect(sX+i*40, sY+j*40, 38, 38);
            }
        }
    }
    drawGNN() {
        this.ctx.fillStyle = '#00ff88'; this.ctx.strokeStyle = 'rgba(0,255,136,0.2)';
        const nodes = Array.from({length:25}, (_,i)=>({x:this.canvas.width/2+Math.cos(i)*180, y:this.canvas.height/2+Math.sin(i)*180}));
        nodes.forEach(n => {
            nodes.forEach(m => { this.ctx.beginPath(); this.ctx.moveTo(n.x, n.y); this.ctx.lineTo(m.x, m.y); this.ctx.stroke(); });
            this.ctx.beginPath(); this.ctx.arc(n.x, n.y, 4, 0, Math.PI*2); this.ctx.fill();
        });
    }
    drawCore() {
        // CORE: 高斯分布擬合 (Gaussian Core)
        this.ctx.strokeStyle='#00ff88'; this.ctx.lineWidth = 2; this.ctx.beginPath();
        for(let x=0; x<this.canvas.width; x++) {
            let nX = (x - this.canvas.width/2) / 100;
            let y = Math.exp(-0.5 * nX * nX) * 200;
            this.ctx.lineTo(x, this.canvas.height - y - 100);
        }
        this.ctx.stroke();
    }
}
