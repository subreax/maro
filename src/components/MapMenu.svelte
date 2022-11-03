<script>
    import PathTuningComponent from "./PathTuningComponent.svelte";

    export let className = "";
    export let searchText = "";

    let routing = false;
</script>


<div class="component {className}">
    {#if !routing}
        <div class="main">
            <div class="search"><input type="text" placeholder="Поиск по ВДНХ" bind:value={searchText}></div>
            <div class="icon separator">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>

            <div class="icon" on:click={() => routing = true}>
                <i class="fa-solid fa-route"></i>
            </div>
        </div>


    {:else}
        <div class="main">
            <div class="icon" on:click={() => routing = false}>
                <i class="fa-solid fa-chevron-left"></i>
            </div>
            <p class="title">Построение маршрута</p>
        </div>
        <PathTuningComponent className="path-tuning-component1" contentClassName="ptcomponent-content1" />
    {/if}
</div>

<style>
    i {
        display: block;
    }

    .component {
        background: #FAF2EF;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }

    .main {
        display: flex;
    }

    .search {
        flex: 1;
    }

    .title {
        padding: 16px 0; 
        display: block;
        line-height: 1rem;
        font-weight: 600;
        color: #686868;
    }

    .search input {
        border: none;
        outline: none;
        background: none;
        box-sizing: border-box;
        width: 100%;
        height: 24px;
        line-height: 24px;
        margin: 11px 16px;
    }

    .icon {
        flex: 0;
        display: block;
        padding: 16px;
        position: relative;
        cursor: pointer;
        color: #686868;
    }

    .icon:hover {
        color: #212121;
    }

    .separator::after {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 12px;
        bottom: 12px;
        border-right: 1px solid #a8a8a8;
    }

</style>