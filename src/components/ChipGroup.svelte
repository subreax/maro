<script>
    import { createEventDispatcher } from "svelte";
    import ToggleButton from "./ToggleButton.svelte";

    const dispatch = createEventDispatcher();

    export let items = [
        /* { text: "", checked?: false} */
    ];

    export let singleSelect = false;

    let lastSelected = -1;

    function onItemChecked(checked, i) {
        if (!singleSelect) {
            items[i].checked = checked;
            notifyChecked(items[i]);
            return;
        }

        if (checked) {
            if (lastSelected !== -1) {
                items[lastSelected].checked = false;
            }

            lastSelected = i;
        }
        else {
            lastSelected = -1;
        }   
        
        items[i].checked = checked;
        notifyChecked(items[i]);
    }

    function notifyChecked(item) {
        dispatch("checked", { item });
    }

</script>

<div class="chip-group">
    {#each items as item, i}
        <ToggleButton   className="btn__chip" 
                        toggledClass="btn__chip--toggled" 
                        toggled={item.checked} 
                        on:toggle={(event) => {onItemChecked(event.detail.toggle, i)}}
                        >
            {item.text}
        </ToggleButton>
    {/each}
</div>
