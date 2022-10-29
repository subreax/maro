<script>
    import ToggleButton from "./ToggleButton.svelte";

    export let wishes = [
        { id: "1", text: "Только бесплатно" },
        { id: "2", text: "Меньше людей" },
        { id: "3", text: "На электробусах" },
        { id: "4", text: "На улице" },
        { id: "5", text: "В помещении" },
    ];
</script>

<div class="chip-group">
    {#each wishes as wish (wish.id)}
        <ToggleButton className="btn__chip" toggledClass="btn__chip--toggled" >{wish.text}</ToggleButton>
    {/each}
</div>

