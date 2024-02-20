import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { ALLOWED_MODIFIER_KEYS } from "../constants";

const useKeyPress = (
	keys: string,
	callback: Function,
	settings?: {
		node?: HTMLElement | string;
		shouldIgnoreInput?: boolean;
	}
) => {
	const callbackRef = useRef(callback);
	useLayoutEffect(() => {
		callbackRef.current = callback;
	});

	// handle what happens on key press
	const handleKeyPress = useCallback(
		(event: Partial<KeyboardEvent & Event>) => {
			const focusedElement = document.activeElement?.tagName.toLowerCase();

			if (settings?.shouldIgnoreInput || (focusedElement && !["input"].includes(focusedElement))) {
				if (keys.includes("+")) {
					const [modifier, key] = keys.split("+") as ["shift" | "ctrl", string];

					if (!ALLOWED_MODIFIER_KEYS.includes(modifier)) throw "Incorrect Modifier key";

					const modifierKeyInEvent = (modifier + "Key") as modifierKeyInEventType;

					if (event?.key === key && event[modifierKeyInEvent]) {
						event!.preventDefault!();
						callbackRef.current(event);
					}
				} else if (event?.key === keys) callbackRef.current(event);
			}
		},
		[keys]
	);

	useEffect(() => {
		// target is either the provided node or the document

		let targetNode: Document | HTMLElement = document;
		if (settings?.node instanceof String) {
			const queryElement = document.querySelector(settings?.node as string) as HTMLElement;
			targetNode = queryElement ? queryElement : document;
		}

		// attach the event listener
		targetNode.addEventListener("keydown", handleKeyPress);

		// remove the event listener
		return () => targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
	}, [handleKeyPress, settings?.node]);
};
export default useKeyPress;
