import React, { useState } from "react";
import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import SingleModeTab from "./Tabs/SingleModeTab";
import BatchModeTab from "./Tabs/BatchModeTab";
import "./BlockGenerator.css";

const BlockGenerator = () => {
    const cardTabs = [
        { id: "single", label: "Один блок" },
        { id: "batch", label: "Пакетный режим" },
    ];
    const [activeTab, setActiveTab] = useState("single");

    return (
        <div className="block-generator">
            <PageTitle
                text="Генератор конфигураций блоков"
                subtext="Быстрое создание пакета JSON файлов для контент-пака JustBlocks"
            />

            <Card title={"Параметры генерации"} tabs={cardTabs} activeTabId={activeTab} onTabChange={setActiveTab}>
                {activeTab === "single" && <SingleModeTab />}
                {activeTab === "batch" && <BatchModeTab/>}
            </Card>
        </div>
    );
};

export default BlockGenerator;
