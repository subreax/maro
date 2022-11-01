<script>
    import ExpandableItem from "./ExpandableItem.svelte";
    import ChipGroup from "./ChipGroup.svelte";

    export let exhibitionsData = [
        {
            title: "Музейные",
            items: [
                { textId: "museum_expo", text: "Экспозиции" },
                { textId: "museum_excursions", text: "Экскурсии" },
            ]
        },
        {
            title: "Развлекательные",
            items: [
                { textId: "", text: "Фестивали" },
                { textId: "", text: "Концерты" },
                { textId: "", text: "Аттракционы" },
            ]
        },
        {
            title: "Образовательные",
            items: [
                { textId: "", text: "Мастер-классы" },
                { textId: "", text: "Лекции" },
            ]
        },
        {
            title: "Спортивные",
            items: [
                { textId: "", text: "Мастер-классы" },
                { textId: "", text: "Забеги" },
                { textId: "", text: "Периодические мероприятия" },
            ]
        },
        {
            title: "Гастрономические",
            items: [
                { textId: "", text: "Гастрофестивали" }
            ]
        },
        {
            title: "Деловые",
            items: [
                { textId: "", text: "ЭКСПО" }
            ]
        }
    ];

    export let foodData = [
        { textId: "", text: "Кафе" },
        { textId: "", text: "Ресторан" },
        { textId: "", text: "Стрипфуд" }
    ];

    export let strollData = [
        { textId: "", text: "Фонтаны" },
        { textId: "", text: "Ракета" },
        { textId: "", text: "Архитектура" },
        { textId: "", text: "Пруды" },
        { textId: "", text: "Ботанический сад" },
    ];

    export let servicesData = [
        { textId: "", text: "Инфоцентр" },
        { textId: "", text: "Туалеты" },
        { textId: "", text: "Комната матери и ребёнка" },
    ]
        
    let expandedItem = "";

    function onItemToggled(event) {
        const itemId = event.detail.itemId.toString();
        const state = event.detail.state;
        
        let newExpandedItem = ""

        if (state) {
            newExpandedItem = itemId;
        } 
        else {
            newExpandedItem = itemId.substring(0, itemId.length-1);
        }

        expandedItem = newExpandedItem;
    }


</script>

<div>
    <ExpandableItem itemId="1" 
                    title="Мероприятия и активности"
                    expanded={expandedItem==="1"} 
                    on:toggle={onItemToggled} 
                    >
        {#each exhibitionsData as section}
            <p class="list-item__title">{section.title}</p>
            <ChipGroup items={section.items} />
        {/each}
    </ExpandableItem>

    <ExpandableItem itemId="2" 
                    title="Приём пищи"
                    expanded={expandedItem==="2"} 
                    on:toggle={onItemToggled} 
                    >
        <ChipGroup items={foodData} />
    </ExpandableItem>

    <ExpandableItem itemId="3" 
                    title="Прогулка"
                    expanded={expandedItem==="3"} 
                    on:toggle={onItemToggled} 
                    >
        <ChipGroup items={strollData} />
    </ExpandableItem>

    <ExpandableItem itemId="4" 
                    title="Сервисы"
                    expanded={expandedItem==="4"} 
                    on:toggle={onItemToggled} 
                    addSeparator={false}
                    >
        <ChipGroup items={servicesData} />
    </ExpandableItem>
</div>
