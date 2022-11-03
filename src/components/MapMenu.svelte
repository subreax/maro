<script>
    export let className = "";
    export let searchText = "";

    let routing = false;
</script>


<div class="component {className}">
    {#if !routing}
        <div class="search"><input type="text" placeholder="Поиск по ВДНХ" bind:value={searchText}></div>
        <div class="icon separator">
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>

        <div class="icon" on:click={() => routing = true}>
            <i class="fa-solid fa-route"></i>
        </div>
    {:else}
        <h2></h2>
    {/if}
</div>

<style>
    i {
        display: block;
    }

    .component {
        display: flex;
        width: 400px;
        background: #FAF2EF;
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }

    .search {
        flex: 1;
    }

    .search input {
        border: none;
        outline: none;
        background: none;
        box-sizing: border-box;
        width: 100%;
        height: 24px;
        line-height: 24px;
        margin: 11px;
    }

    .icon {
        flex: 0;
        display: block;
        padding: 16px;
        position: relative;
        cursor: pointer;
        color: #909090;
    }

    .icon:hover {
        color: #212121;
    }

    .separator::after {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 10px;
        bottom: 10px;
        border-right: 1px solid #a8a8a8;
    }

</style>