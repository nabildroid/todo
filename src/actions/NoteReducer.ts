import { Item } from "../main";

// action type of the reducer
export enum NoteActions {
	ADD,
	UPDATE,
	LOAD,
}

// here put any unit test you wont :)

type PayloadType = Item | Item[] | { done: boolean; created: number };

export type ReducerAction = {
	type: NoteActions;
	payload: PayloadType;
};

function isPayloadForAdd(
	payload: PayloadType,
	type: NoteActions
): payload is Item {
	return type == NoteActions.ADD;
}

function isPayloadForUpdate(
	payload: PayloadType,
	type: NoteActions
): payload is { done: boolean; created: number } {
	return type == NoteActions.UPDATE;
}
function isPayloadForLoad(
	payload: PayloadType,
	type: NoteActions
): payload is Item[] {
	return type == NoteActions.LOAD;
}

export default function reducer(items: Item[], action: ReducerAction) {
	const { type, payload } = action;

	if (isPayloadForAdd(payload, type)) {
		return [payload, ...items];
	}

	if (isPayloadForUpdate(payload, type)) {
		return items.map((item) => {
			if (item.history[0].time === payload.created) {
				item.done = payload.done;
				item.history.push({
					time: Date.now(),
					type: payload.done ? "done" : "undone",
				});
			}
			return item;
		});
	}

	if (isPayloadForLoad(payload, type)) {
		return payload;
	}

	return items;
}
