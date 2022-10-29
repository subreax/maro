<script>
    import ToggleButton from "./ToggleButton.svelte";


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

<div class="chip-group">
    {#each interests as interest (interest.id)}
        <ToggleButton className="btn__chip" toggledClass="btn__chip--toggled">{interest.text}</ToggleButton>
    {/each}
</div>
