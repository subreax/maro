<script>
    import ToggleButton from "./ToggleButton.svelte";

    export let items = [
        /* { text: "", checked: false} */
    ];

    export let singleSelect = false;


</script>

<div class="chip-group">
    {#each items as item}
        <ToggleButton className="btn__chip" toggledClass="btn__chip--toggled" toggled={item.checked} on:toggle={() =>  {}}>{item.text}</ToggleButton>
    {/each}
</div>
