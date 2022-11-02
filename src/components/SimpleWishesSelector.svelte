<script>
    import IdControlledChipGroup from "./IdControlledChipGroup.svelte";

    export let wishes = [
        { id: 1, text: "Только бесплатно" },
        { id: 32, text: "Меньше людей" },
        { id: 8, text: "На электробусах" },
        { id: 64, text: "На улице" },
        { id: 128, text: "В помещении" },
    ];

    export let checkedItems = 0;
</script>

<IdControlledChipGroup items={wishes} bind:checkedItems={checkedItems} />
