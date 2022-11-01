<script>
    import ExpandableItem from "./ExpandableItem.svelte";
    import ToggleButton from "./ToggleButton.svelte";

    export let data = [
        {
            id: 1,
            title: "Стоимость",
            items: [
                { id: 1, textId: "price_free", text: "Только бесплатно" },
                { id: 2, textId: "price_paid", text: "Только платно" },
                { id: 3, textId: "price_nomatter", text: "Пох" }
            ]
        },
        {
            id: 2,
            title: "Передвижение",
            items: [
                { id: 1, textId: "mov_onfoot", text: "Пешком" },
                { id: 2, textId: "mov_electrobus", text: "На электробусе" },
                { id: 3, textId: "mov_nomatter", text: "Пох"}
            ]
        },
        {
            id: 3,
            title: "Люди",
            items: [
                { id: 1, textId: "people_many", text: "Много"},
                { id: 2, textId: "people_less", text: "Мало"},
                { id: 3, textId: "people_nomatter", text: "Пох"}
            ]
        },
        {
            id: 4,
            title: "Где",
            items: [
                { id: 1, textId: "where_outdoor", text: "Только на улице"},
                { id: 2, textId: "where_indoor", text: "Только в помещении"},
                { id: 3, textId: "where_nomatter", text: "Похую"},
            ]
        },
        {
            id: 5,
            title: "Особые",
            items: [
                { id: 1, textId: "special_invalid", text: "Доступность для людей с ОВЗ"}
            ]
        }
    ];

</script>



<div>
    {#each data as section (section.id)}
        <ExpandableItem title={section.title}>
            <div class="chip-group" on:click={() => {}}>
                {#each section.items as item (item.id)}
                    <ToggleButton className="btn__chip" toggledClass="btn__chip--toggled" >{item.text}</ToggleButton>
                {/each}
            </div>
        </ExpandableItem>
    {/each}
</div>