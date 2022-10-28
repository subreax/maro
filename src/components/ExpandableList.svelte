<script>
    import ExpandableItem from "./ExpandableItem.svelte";

    export let style = "";
    export let data = [];

    let expandedItemId = "";

    function onItemToggled(e) {
        const itemId = e.detail.itemId;
        const state = e.detail.state;
        expandedItemId = state ? itemId : "";
    }


</script>

<div class="component" {style}>
    {#each data as item (item.id)}
        <ExpandableItem itemId={item.id.toString()} title={item.title} on:toggle={onItemToggled} expanded={item.id.toString() === expandedItemId}>
            {@html item.content}
        </ExpandableItem>
    {:else}
        <p>No content</p>
    {/each}
</div>
