<script>
    import ChipGroup from "./ChipGroup.svelte";

    export let interests = [
        { id: "1", text: "Музеи" },
        { id: "2", text: "Туалет" },
        { id: "3", text: "Приём пищи" },
        { id: "4", text: "Развлечения" },
        { id: "5", text: "Образование" },
        { id: "6", text: "Спорт" },
        { id: "7", text: "Гастрономические мероприятия" },
        { id: "8", text: "Прогулка" },
        { id: "9", text: "Детские площадки" },
    ];
</script>

<ChipGroup items={interests} />
