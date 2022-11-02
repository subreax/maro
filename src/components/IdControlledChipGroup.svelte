<!-- Chip checked status is controlled by its bit mask id. 
    If a chip is toggled on then
    checkedItems |= chip.id
-->

<script>
    import ToggleButton from "./ToggleButton.svelte";

    export let items = [
        /* { id: bitmask, text: "" } */
    ];

    export let checkedItems = 0;

    export let singleSelect = false;

    function onItemChecked(checked, i) {
        let newCheckedItems = checkedItems;
        if (singleSelect) {
            items.forEach((item) => {
                newCheckedItems &= ~(item.id);
            });
        }


        if (checked) {
            newCheckedItems |= items[i].id;
        }
        else {
            newCheckedItems &= ~(items[i].id);
        }

        checkedItems = newCheckedItems;
    }

</script>

<div class="chip-group">
    {#each items as item, i}
        <ToggleButton   className="btn__chip" 
                        toggledClass="btn__chip--toggled" 
                        toggled={(checkedItems & item.id) === item.id} 
                        on:toggle={(event) => {onItemChecked(event.detail.toggle, i)}}
                        >
            {item.text}
        </ToggleButton>
    {/each}
</div>
