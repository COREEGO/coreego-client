import ReactQuill from "react-quill";

const ReactQuillInput = ({value, onChange}) => {

	const modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["image"]
		],
	};

	return (
		<ReactQuill placeholder="Entrez votre texte ici..." theme="snow" modules={modules} value={value} onChange={onChange} />
	);
};

export default ReactQuillInput;
