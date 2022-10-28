<script>
    import ExpandableItem from "./ExpandableItem.svelte";

    export let style = "";
    export let data = [];

    $: lastId = data[data.length-1].id.toString();

    let expandedItemId = "";

    function onItemToggled(e) {
        const itemId = e.detail.itemId;
        const state = e.detail.state;
        expandedItemId = state ? itemId : "";
    }


</script>

<div {style}>
    {#each data as item (item.id)}
        <ExpandableItem itemId={item.id.toString()} 
                        title={item.title} 
                        expanded={item.id.toString() === expandedItemId} 
                        addSeparator={item.id.toString() !== lastId}
                        on:toggle={onItemToggled} 
                        >
            {@html item.content}
        </ExpandableItem>
    {:else}
        <p>No content</p>
    {/each}
</div>
