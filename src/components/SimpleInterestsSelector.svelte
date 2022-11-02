<script>
    import IdControlledChipGroup from "./IdControlledChipGroup.svelte";

    export let interests = [
        { id: 1 | 1<<2 | 1<<3, text: "Музеи" },
        { id: 1<<16 | 1<<17 | 1<<18 | 1<<19 | 1<<20, text: "Прогулка" },
        { id: 1<<9 | 1<<10 | 1<<24, text: "Спорт" },
        { id: 1<<13 | 1<<14 | 1<<15, text: "Приём пищи" },
        { id: 1<<4 | 1<<5 | 1<<6, text: "Развлечения" },
        { id: 1<<11, text: "Гастрономические мероприятия" },
        { id: 1<<7 | 1<<8, text: "Образование" },
        { id: 1<<22, text: "Туалет" },
        /* { id: 1<<6, text: "Детские площадки" }, */
    ];

    export let checkedInterests = 0;
</script>

<IdControlledChipGroup items={interests} bind:checkedItems={checkedInterests} />
