import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillInput = ({value, onChange}) => {

	const modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ align: [] }],
			["image", "blockquote"]
		],
	};

	return (
		<ReactQuill placeholder="Entrez votre texte ici..." theme="snow" modules={modules} value={value} onChange={onChange} />
	);
};

export default ReactQuillInput;
