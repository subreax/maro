<script>
    import IdControlledChipGroup from "./IdControlledChipGroup.svelte";

    export let data = [
        {
            title: "Стоимость",
            items: [
                { id: 1, text: "Только бесплатно" },
                { id: 2, text: "Только платно" },
            ]
        },
        {
            title: "Передвижение",
            items: [
                { id: 4, text: "Пешком" },
                { id: 8, text: "На электробусе" },
            ]
        },
        {
            title: "Загруженность",
            items: [
                { id: 16, text: "Много людей"},
                { id: 32, text: "Мало людей"},
            ]
        },
        {
            title: "Место",
            items: [
                { id: 64, text: "Только на улице"},
                { id: 128, text: "Только в помещении"},
            ]
        },
        {
            title: "Особые",
            items: [
                { id: 256, text: "Доступность для людей с ОВЗ"}
            ]
        }
    ];

    export let checkedWishes = 0;

</script>



<div>
    {#each data as section}
        <p class="list-item__title">{section.title}</p>
        <IdControlledChipGroup items={section.items} singleSelect={true} bind:checkedItems={checkedWishes} />
    {/each}
</div>


<style>

</style>