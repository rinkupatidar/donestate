type modifierKeys = "shift" | "ctrl";
type modifierKeyInEventType = "shiftKey" | "ctrlKey";
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type DropdownItemType = string | { displayValue: string; [key: string]: any };

type IntervalTypes = "ONE_DAY" | "ONE_MINUTE";

interface SearchInterface {
	equity_name: string;
	equity_symbol: string;
}
