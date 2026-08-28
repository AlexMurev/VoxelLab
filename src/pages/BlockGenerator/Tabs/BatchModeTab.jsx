import React from "react";
import Button from "../../../components/Button/Button";
import DropZone from "../../../components/DropZone/DropZone";
import TextArea from "../../../components/FormControls/TextArea";
import Select from "@/components/FormControls/Select";
import FieldWrapper from "../../../components/FormControls/FieldWrapper";

const BatchModeTab = () => {
    return (
        <form className="block-generator__form">
            <Select title={"Шаблон блока"}>
                <option value="stairs">Ступеньки</option>
                <option value="fence">Забор</option>
                <option value="slab">Плита</option>
            </Select>

            <FieldWrapper title={"Список текстур"}>
                <DropZone />
            </FieldWrapper>

            <TextArea
                placeholder="Или введите названия вручную (по одному на строку):&#10;white_wool&#10;yellow_wool&#10;green_wool"
            />
            <div className="block-generator__actions">
                <Button>Скачать структурой пака (.zip)</Button>
                <Button variant="secondary">Только JSON файлы (.zip)</Button>
            </div>
        </form>
    );
};

export default BatchModeTab;
