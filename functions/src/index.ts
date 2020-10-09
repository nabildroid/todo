import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp();

// type Note = {
// 	title: string;
// 	content: string;
// 	done: boolean;
// 	history: {
// 		time: number;
// 		type: "created" | "done" | "undone";
// 	}[];
// };
const noteRef = admin.firestore().collection("notes");
export const note = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('no-cors');
	const route = req.path.split("/").filter((a) => a);

	if (route[0] == "list") {
		return listNotes(res);
	} else if (route[0] == "add" && req.body) {
		const { title, content } = req.body as {
			title: string;
			content: string;
		};
		return addNote(title, content, res);
	} else if (route[0] == "update" && req.body) {
		const { created, done } = req.body as {
			created: number;
			done: boolean;
		};
		return updateNote(created, !!done, res);
	} else return res.send("");
});

function listNotes(res: functions.Response) {
	return noteRef.get().then((snapshot) => {
		const result = snapshot.docs.map((d) => d.data());
		res.contentType("application/json");
		res.json(result);
	});
}

function addNote(title: string, content: string, res: functions.Response) {
	const note = {
		title,
		content,
		done: false,
		history: [
			{
				time: Date.now(),
				type: "created",
			},
		],
	};

	return noteRef.add(note).then(() => {
		res.send("note has been added");
	});
}

// API for saving and loading and updating notes
// /update [pos] /create [post] /list [get]

function updateNote(created: number, done: boolean, res: functions.Response) {
	const history = admin.firestore.FieldValue.arrayUnion({
		time: Date.now(),
		type: done ? "done" : "undone",
	});

	noteRef
		.where("history", "array-contains", {
			time: created,
			type: "created",
		})
		.select()
		.limit(1)
		.get()
		.then((query) => {
			query.docs.map(({ ref }) => {
				return ref.update({ history, done });
			});
		})
		.then(() => res.send("note changed"));
}
