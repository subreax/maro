<script>
    import { createEventDispatcher } from "svelte";
    import { slide } from "svelte/transition"

    const dispatch = createEventDispatcher();

    export let itemId = "";
    export let title = "Empty title";
    export let expanded = false;
    export let addSeparator = true;

    function toggleContent(val) {
        expanded = val;
        dispatch("toggle", {
            itemId: itemId,
            state: expanded
        });
    }

    function onClick() {
        toggleContent(!expanded);
    }

</script>

<div>
    <p class="title" class:title--active={expanded} on:click={() => onClick()}>
        {title}
        <i class="fa-solid" class:fa-chevron-down={!expanded} class:fa-chevron-up={expanded}></i>
    </p>

    {#if expanded}
        <div class="content" transition:slide>
            <slot></slot>
        </div>
    {/if}

    {#if addSeparator}
        <hr>
    {/if}
</div>


<style>
    .title {
        position: relative;
        cursor: pointer;
        font-size: 1rem;
        padding: 1em;
        font-weight: 600;
        color: #999999;
        transition: color 0.2s;
    }

    .title--active {
        color: #da8c90;
    }

    .title:hover {
        background: #f5f5f5;
        color: #da8c90;
    }

    .title i {
        position: absolute;
        
        top: 1.5em;
        right: 0.5em;
        transform: translate(-50%, -50%);
        z-index: 1;
    }

    .content {
        margin: 10px 16px;
    }

    hr {
        color: #DBDBDBB2;
        margin: 0 1em;
    }

</style>