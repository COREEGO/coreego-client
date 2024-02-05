import { Button } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillInput = ({value, onChange}) => {


	const modules = {
		toolbar: [
			//   [{ 'header': [1, 2, 3, false] }], // Titres
			["bold", "italic", "underline", "strike"], // Texte en gras, italique, souligné et barré
			[{ list: "ordered" }, { list: "bullet" }], // Listes
			//   [{ 'script': 'sub'}, { 'script': 'super' }], // Subscript/superscript
			//   [{ 'indent': '-1'}, { 'indent': '+1' }], // Indentation
			// [{ direction: "rtl" }], // Texte de droite à gauche
			//   [{ 'size': ['small', false, 'large', 'huge'] }], // Taille du texte
			//   [{ 'color': [] }, { 'background': [] }], // Couleur du texte et du fond
			//   [{ 'font': [] }], // Police
			[{ align: [] }], // Alignement
			//   ['clean'], // Nettoyer les styles
			["image", "blockquote"] // Liens, images et citations
		],
	};

	return (
		<ReactQuill placeholder="Entrez votre texte ici..." theme="snow" modules={modules} value={value} onChange={onChange} />
	);
};

export default ReactQuillInput;
