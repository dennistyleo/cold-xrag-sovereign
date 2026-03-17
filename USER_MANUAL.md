# 📘 COLD_XRAG: Sovereign V36 User Manual

## **1. Environment Initialization**
The Sovereign substrate requires a deterministic execution environment to ensure mathematical reproducibility.

1. **Clone the Production Core:**
   ```bash
   git clone https://github.com/dennistyleo/cold-xrag-sovereign.git
   cd cold-xrag-sovereign
   ```
2. **Launch the Substrate:**
   ```bash
   python3 -m http.server 5003
   ```
3. **Access the Dashboard:** Open Chrome/Edge and navigate to `http://127.0.0.1:5003`.

---

## **2. Standard Operating Procedure (SOP)**

### **Step 1: Axiom Selection (L1 Ingest)**
* Click on any axiom within the **375 Axiom Substrate** sidebar.
* Verify the **Axiom Hash** appears in the forensic log at the bottom right.

### **Step 2: Structural Admissibility (L2-L4)**
* Monitor the **World Lattice (32x32 Volumetric)**.
* **Warning:** If structural stress exceeds thresholds ($s < 0.88$), the node will render in **Crimson Mapping**, indicating a causal failure.

### **Step 3: Sovereign Validation (L5 Audit)**
* Ensure the system invariant is locked at **$C_{\phi}=1.0$**.
* Click **[GENERATE AUDIT REPORT]** to freeze the current claim state and produce a deterministic integrity block.
