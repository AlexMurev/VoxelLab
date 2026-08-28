import React from "react";
import Button from "../../../components/Button/Button";
import Select from "../../../components/FormControls/Select";
import Input from "../../../components/FormControls/Input";
import { useState } from "react";
import { useJsonExporter } from "../../../hooks/useJsonExporter";

const SingleModeTab = () => {
    const [formData, setFormData] = useState({ blockType: "stairs" });
    const { isGenerating, downloadArchive } = useJsonExporter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTextureNamesChange = (e) => {
        const { name, value } = e.target;
        const textureNames = value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
        setFormData((prev) => ({ ...prev, [name]: textureNames }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const action = e.nativeEvent.submitter?.value;
        if (!isGenerating) {
            console.log("start downloading", formData.blockType);
            downloadArchive(formData, action);
        }
    };

    return (
        <form className="block-generator__form" onSubmit={handleSubmit}>
            <Select title={"Шаблон блока"} name="blockType" value={formData.blockType} onChange={handleChange}>
                <option value="stairs">Ступеньки</option>
                <option value="fence">Забор</option>
                <option value="slab">Плита</option>
            </Select>

            <Input name="packId" title={"ID вашего пака"} placeholder={"justblocks"} onChange={handleChange} />

            <Input
                name="textureNames"
                title={"Название текстуры"}
                placeholder={"oak_planks"}
                onChange={handleTextureNamesChange}
            />

            <Input name="materialId" title={"ID материала"} placeholder={"base:wood"} onChange={handleChange} />

            <Input name="durability" title={"Прочность"} placeholder={"base:wood"} onChange={handleChange} />

            <div className="block-generator__actions">
                <Button type="submit" value="pack_struct" name="action">
                    Скачать структурой пака (.zip)
                </Button>
                <Button variant="secondary" type="submit" value="only_json" name="action">
                    Только JSON файлы (.zip)
                </Button>
            </div>
        </form>
    );
};

export default SingleModeTab;
