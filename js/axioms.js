const coreLogic = [
    { n: "Navier-Stokes", f: "\\rho(\\partial_t v + v\\cdot\\nabla v) = -\\nabla p + \\mu\\nabla^2 v" },
    { n: "Power Factor", f: "P = VI \\cos(\\phi)" },
    { n: "Black-Scholes", f: "\\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} = rV" },
    { n: "Gauss's Law", f: "\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}" },
    { n: "Gauss's Law for Magnetism", f: "\\nabla \\cdot \\mathbf{B} = 0" },
    { n: "Faraday's Law of Induction", f: "\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}" },
    { n: "Ampère's Circuital Law", f: "\\nabla \\times \\mathbf{B} = \\mu_0\\left(\\mathbf{J} + \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}\\right)" },
    { n: "Schrödinger Equation", f: "i\\hbar\\frac{\\partial}{\\partial t}\\Psi = \\hat{H}\\Psi" },
    { n: "Mass-Energy Equivalence", f: "E = mc^2" },
    { n: "Newton's Second Law", f: "\\mathbf{F} = m\\mathbf{a}" },
    { n: "Newton's Law of Universal Gravitation", f: "F = G\\frac{m_1 m_2}{r^2}" },
    { n: "Euler's Identity", f: "e^{i\\pi} + 1 = 0" },
    { n: "Pythagorean Theorem", f: "a^2 + b^2 = c^2" },
    { n: "Second Law of Thermodynamics", f: "dS \\ge \\frac{\\delta Q}{T}" },
    { n: "Ideal Gas Law", f: "PV = nRT" },
    { n: "Fourier Transform", f: "\\hat{f}(\\xi) = \\int_{-\\infty}^\\infty f(x) e^{-2\\pi i x \\xi} \\,dx" },
    { n: "Heisenberg Uncertainty Principle", f: "\\Delta x \\Delta p \\ge \\frac{\\hbar}{2}" },
    { n: "Shannon Entropy", f: "H(X) = -\\sum P(x)\\log_2 P(x)" },
    { n: "Hooke's Law", f: "F = -kx" },
    { n: "Bernoulli's Equation", f: "\\frac{v^2}{2} + gz + \\frac{p}{\\rho} = \\text{constant}" },
    { n: "Stefan-Boltzmann Law", f: "j^{\\star} = \\sigma T^4" },
    { n: "Bragg's Law", f: "n\\lambda = 2d \\sin \\theta" },
    { n: "Lorentz Force", f: "\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v} \\times \\mathbf{B})" },
    { n: "Ohm's Law", f: "V = IR" },
    { n: "Calculus Fundamental Theorem", f: "\\int_a^b f(x) dx = F(b) - F(a)" },
    { n: "Quadratic Formula", f: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" },
    { n: "Taylor Series", f: "f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n" },
    { n: "Stokes' Theorem", f: "\\int_{\\partial \\Omega} \\omega = \\int_{\\Omega} d\\omega" },
    { n: "Laplace's Equation", f: "\\nabla^2 f = 0" },
    { n: "Wave Equation", f: "\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\nabla^2 u" },
    { n: "Sine Rule", f: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}" },
    { n: "Cosine Rule", f: "c^2 = a^2 + b^2 - 2ab \\cos C" },
    { n: "Larmor Formula", f: "P = \\frac{\\mu_0 q^2 a^2}{6\\pi c}" },
    { n: "Rydberg Formula", f: "\\frac{1}{\\lambda} = R_Z \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)" },
    { n: "Boltzmann Equation", f: "S = k_B \\ln W" },
    { n: "Gauss-Bonnet Theorem", f: "\\int_M K dA + \\int_{\\partial M} k_g ds = 2\\pi \\chi(M)" },
    { n: "Cauchy-Riemann Equations", f: "\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}, \\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}" },
    { n: "Dirac Equation", f: "(i\\gamma^\\mu \\partial_\\mu - m)\\psi = 0" },
    { n: "De Broglie Wavelength", f: "\\lambda = \\frac{h}{p}" },
    { n: "Kepler's Third Law", f: "P^2 \\propto a^3" },
    { n: "Carnot Efficiency", f: "\\eta = 1 - \\frac{T_C}{T_H}" },
    { n: "Ampère's Force Law", f: "F_m = 2k_A \\frac{I_1 I_2}{r}" }
];

const applications = ["AEROSPACE", "MARINE", "ENERGY", "MEDICAL", "MILITARY", "ROBOTICS", "FINANCE", "BLOCKCHAIN", "RETAIL"];

function getContextName(app, logicName) {
    if (logicName === "Navier-Stokes") {
        if (app === "AEROSPACE") return "AEROSPACE: Fluid Drag";
        if (app === "MARINE") return "MARINE: Hydro-Dynamic Drag";
        return `${app}: Flow Dynamics`;
    }
    return `${app}: ${logicName}`;
}

const AX = [];
for (let i = 0; i < 378; i++) {
    const app = applications[i % applications.length];
    const logic = coreLogic[Math.floor(i / (378 / coreLogic.length)) % coreLogic.length];
    AX.push({
        id: `XRAG-${String(i+1).padStart(4, '0')}`,
        name: getContextName(app, logic.n),
        formula: logic.f,
        type: app
    });
}
window.axiomSubstrate = AX;
