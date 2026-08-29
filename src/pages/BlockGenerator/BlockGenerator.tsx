import { useState } from "react";
import type { ChangeEvent } from "react";
import Card from "@/components/Card/Card";
import PageTitle from "@/components/PageTitle/PageTitle";
import Select from "@/components/FormControls/Select";
import Input from "@/components/FormControls/Input";
import Button from "@/components/Button/Button";
import FieldWrapper from "@/components/FormControls/FieldWrapper";
import DropZone from "@/components/DropZone/DropZone";
import TextArea from "@/components/FormControls/TextArea";
import { useJsonExporter } from "./useJsonExporter";
import type { BlockGeneratorFormData } from "./types";
import type { SyntheticEvent } from "react";
import "./BlockGenerator.css";

const BlockGenerator = () => {
    const cardTabs = [
        { id: "single" as const, title: "Один блок" },
        { id: "batch" as const, title: "Пакетный режим" },
    ];

    const [activeTab, setActiveTab] = useState<string>("single");

    const [formData, setFormData] = useState<BlockGeneratorFormData>({ 
        blockType: "stairs",
        textureNames: [],
        packId: "justblocks",
        materialId: "",
        durability: 0
    });
    
    const { isGenerating, downloadArchive } = useJsonExporter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTextureNamesChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const textureNames = value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
        setFormData((prev) => ({ ...prev, [name]: textureNames }));
    };

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    const submitter = e.nativeEvent.submitter as HTMLButtonElement | null;
    const action = submitter?.value || "only_json";

    if (!isGenerating) {
        console.log("start downloading", formData.blockType);
        downloadArchive(formData, action);
    }
};

    return (
        <div className="block-generator">
            <PageTitle
                text="Генератор конфигураций блоков"
                subtext="Быстрое создание пакета JSON файлов для контент-пака JustBlocks"
            />

            <Card title={"Параметры генерации"} tabs={cardTabs} activeTabId={activeTab} onTabChange={setActiveTab}>
                <form className="block-generator__form" onSubmit={handleSubmit}>
                    <Select title={"Шаблон блока"} name="blockType" value={formData.blockType} onChange={handleChange}>
                        <option value="stairs">Ступеньки</option>
                        <option value="fence">Забор</option>
                        <option value="slab">Плита</option>
                    </Select>

                    <Input name="packId" title={"ID вашего пака"} placeholder={"justblocks"} onChange={handleChange} />

                    <Input name="materialId" title={"ID материала"} placeholder={"base:wood"} onChange={handleChange} />

                    <Input name="durability" title={"Прочность"} placeholder={"base:wood"} onChange={handleChange} />

                    {activeTab === "single" ? (
                        <Input
                            name="textureNames"
                            title="Название текстуры"
                            placeholder="oak_planks"
                            onChange={handleTextureNamesChange}
                        />
                    ) : (
                        <>
                            <FieldWrapper title="Список текстур">
                                <DropZone />
                            </FieldWrapper>
                            <TextArea
                                name="textureNames"
                                placeholder={
                                    "Или введите названия вручную (по одному на строку):\nwhite_wool\nyellow_wool"
                                }
                                onChange={handleTextureNamesChange}
                            />
                        </>
                    )}

                    <div className="block-generator__actions">
                        <Button type="submit" value="pack_struct" name="action">
                            Скачать структурой пака (.zip)
                        </Button>
                        <Button variant="secondary" type="submit" value="only_json" name="action">
                            Только JSON файлы (.zip)
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default BlockGenerator;
