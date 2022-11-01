<script>
    import ChipGroup from "./ChipGroup.svelte";
    import ExpandableItem from "./ExpandableItem.svelte";

    export let data = [
        {
            id: 1,
            title: "Стоимость",
            items: [
                { textId: "price_free", text: "Только бесплатно" },
                { textId: "price_paid", text: "Только платно" },
            ]
        },
        {
            id: 2,
            title: "Передвижение",
            items: [
                { textId: "mov_onfoot", text: "Пешком" },
                { textId: "mov_electrobus", text: "На электробусе" },
            ]
        },
        {
            id: 3,
            title: "Загруженность",
            items: [
                { textId: "people_many", text: "Много людей"},
                { textId: "people_less", text: "Мало людей"},
            ]
        },
        {
            id: 4,
            title: "Место",
            items: [
                { textId: "place_outdoor", text: "Только на улице"},
                { textId: "place_indoor", text: "Только в помещении"},
            ]
        },
        {
            id: 5,
            title: "Особые",
            items: [
                { textId: "special_invalid", text: "Доступность для людей с ОВЗ"}
            ]
        }
    ];

</script>



<div>
    {#each data as section}
        <p class="list-item__title">{section.title}</p>
        <ChipGroup items={section.items} singleSelect={true} />
    {/each}
</div>


<style>

</style>