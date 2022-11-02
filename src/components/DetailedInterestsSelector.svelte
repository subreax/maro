<script>
    import ExpandableItem from "./ExpandableItem.svelte";
    import IdControlledChipGroup from "./IdControlledChipGroup.svelte";

    export let exhibitionsData = [
        {
            title: "Музейные",
            items: [
                { id: 1, text: "Постоянные экспозиции" },
                { id: 1 << 2, text: "Временные экспозиции" },
                { id: 1 << 3, text: "Экскурсии" },
            ]
        },
        {
            title: "Развлекательные",
            items: [
                { id: 1 << 4, text: "Фестивали" },
                { id: 1 << 5, text: "Концерты" },
                { id: 1 << 6, text: "Аттракционы" },
            ]
        },
        {
            title: "Образовательные",
            items: [
                { id: 1 << 7, text: "Мастер-классы" },
                { id: 1 << 8, text: "Лекции" },
            ]
        },
        {
            title: "Спортивные",
            items: [
                { id: 1 << 9, text: "Мастер-классы" },
                { id: 1 << 10, text: "Забеги" },
                { id: 1 << 24, text: "Периодические мероприятия" },
            ]
        },
        {
            title: "Гастрономические",
            items: [
                { id: 1 << 11, text: "Гастрофестивали" }
            ]
        },
        {
            title: "Деловые",
            items: [
                { id: 1 << 12, text: "ЭКСПО" }
            ]
        }
    ];

    export let foodData = [
        { id: 1 << 13, text: "Кафе" },
        { id: 1 << 14, text: "Ресторан" },
        { id: 1 << 15, text: "Стритфуд" }
    ];

    export let strollData = [
        { id: 1 << 16, text: "Фонтаны" },
        { id: 1 << 17, text: "Ракета" },
        { id: 1 << 18, text: "Архитектура" },
        { id: 1 << 19, text: "Пруды" },
        { id: 1 << 20, text: "Ботанический сад" },
    ];

    export let servicesData = [
        { id: 1 << 21, text: "Инфоцентр" },
        { id: 1 << 22, text: "Туалеты" },
        { id: 1 << 23, text: "Комната матери и ребёнка" },
    ]
    
    export let checkedInterests = 0;

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
            <IdControlledChipGroup items={section.items} bind:checkedItems={checkedInterests} />
        {/each}
    </ExpandableItem>

    <ExpandableItem itemId="2" 
                    title="Приём пищи"
                    expanded={expandedItem==="2"} 
                    on:toggle={onItemToggled} 
                    >
        <IdControlledChipGroup items={foodData} bind:checkedItems={checkedInterests} />
    </ExpandableItem>

    <ExpandableItem itemId="3" 
                    title="Прогулка"
                    expanded={expandedItem==="3"} 
                    on:toggle={onItemToggled} 
                    >
        <IdControlledChipGroup items={strollData} bind:checkedItems={checkedInterests} />
    </ExpandableItem>

    <ExpandableItem itemId="4" 
                    title="Сервисы"
                    expanded={expandedItem==="4"} 
                    on:toggle={onItemToggled} 
                    addSeparator={false}
                    >
        <IdControlledChipGroup items={servicesData} bind:checkedItems={checkedInterests} />
    </ExpandableItem>
</div>
