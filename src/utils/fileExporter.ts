import JSZip from "jszip";

export interface ExportFile {
	path: string,
	filename: string,
	content: object
}

export const generateArchive = async (files: ExportFile[], action: string) => {
	const zip = JSZip();
	files.forEach((file) => {
		const fullPath = action === "pack_struct" ? `${file.path}/${file.filename}` : file.filename;
		const fileContent = JSON.stringify(file.content, null, 2);
		zip.file(fullPath, fileContent);
	});
	return zip.generateAsync({ type: "blob" });
};

export const saveBlobAsFile = (blob: Blob, filename: string) => {
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.href = url;
	link.download = filename;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 100);
};