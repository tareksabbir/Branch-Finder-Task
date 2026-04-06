/**
 * Creates a custom HTML element for a branch pin on the map.
 * @param isSelected Whether the pin is currently selected
 * @returns HTMLElement
 */
export function createBranchPin(isSelected: boolean): HTMLElement {
  const pin = document.createElement("div");
  pin.style.cssText = `
    width: ${isSelected ? "36px" : "28px"};
    height: ${isSelected ? "36px" : "28px"};
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    background: ${isSelected ? "#C9A84C" : "#0B1F3A"};
    border: 2.5px solid #ffffff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    transition: transform 0.15s ease, width 0.15s ease, height 0.15s ease;
    cursor: pointer;
  `;
  return pin;
}

/**
 * Creates a custom HTML element for the user's current location pin.
 * @returns HTMLElement
 */
export function createUserPin(): HTMLElement {
  const outer = document.createElement("div");
  outer.style.cssText = `
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #C9A84C;
    border: 2.5px solid #ffffff;
    box-shadow: 0 0 0 4px rgba(201,168,76,0.25);
  `;
  return outer;
}
