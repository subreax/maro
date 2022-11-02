<script>
    import { slide } from "svelte/transition"
    import { createEventDispatcher } from "svelte";
    import ToggleButton from "./ToggleButton.svelte";
    import ExpandableItem from "./ExpandableItem.svelte"
    import SimpleWishesSelector from "./SimpleWishesSelector.svelte";
    import SimpleInterestsSelector from "./SimpleInterestsSelector.svelte";
    import CompanyConfigurer from "./CompanyConfigurer.svelte";
    import DetailedWishesSelector from "./DetailedWishesSelector.svelte";
    import DetailedInterestsSelector from "./DetailedInterestsSelector.svelte";


    const dispatch = createEventDispatcher();


    let modeSelected = 0;
    let expanded = false;
    let expandedItem = "";

    let checkedWishes = 0;
    let checkedInterests = 0;

    function contentToggled(val) {
        expanded = val;
        expandedItem = "";
    }


    function onItemToggled(event) {
        const itemId = event.detail.itemId.toString();
        const state = event.detail.state;
        
        let newExpandedItem = ""

        if (state) {
            newExpandedItem = itemId;
        } 
        else {
            newExpandedItem = itemId.substring(0, itemId.length-1);
        }

        expandedItem = newExpandedItem;
    }


    function onApply() {
        dispatch("apply", { wishes: checkedWishes, interests: checkedInterests });
    }

    function onReset() {
        checkedWishes = 0;
        checkedInterests = 0;
    }

</script>

<div class="wrapper">
    <div class="status-bar">
        <div class="btn-group">
            <ToggleButton   style="width: 100%; flex: 1" 
                            on:toggle={() => modeSelected = 0} 
                            toggled={modeSelected === 0}
                            toggleLocked={modeSelected === 0}>
                Быстрый
            </ToggleButton>

            <ToggleButton   style="width: 100%; flex: 1" 
                            on:toggle={() => modeSelected = 1} 
                            toggled={modeSelected === 1}
                            toggleLocked={modeSelected === 1}>
                Расширенный
            </ToggleButton>
        </div>
        
        <ToggleButton style="margin-left: 16px" className="btn__toggle btn__icon" on:toggle={(event) => contentToggled(event.detail.toggle)}>
            <i class="fa-solid" class:fa-chevron-down={!expanded} class:fa-chevron-up={expanded}></i>
        </ToggleButton>
    </div>

    {#if expanded}
        <div class="expandable-block" transition:slide>

            <div style="margin: 10px 0; background: #fff; border-radius: 20px">
                
                <ExpandableItem title="Пожелания"     
                                itemId="1" 
                                expanded={expandedItem[0] === "1"}
                                on:toggle={onItemToggled} 
                                >
                    {#if modeSelected === 0}
                        <SimpleWishesSelector bind:checkedItems={checkedWishes}/>
                    {:else}
                        <DetailedWishesSelector bind:checkedWishes={checkedWishes}/>
                    {/if}
                </ExpandableItem>

                <ExpandableItem title="Интересы"
                                itemId="2"
                                expanded={expandedItem[0] === "2"}
                                on:toggle={onItemToggled} 
                                >
                    {#if modeSelected === 0}
                        <SimpleInterestsSelector bind:checkedInterests={checkedInterests} />
                    {:else}
                        <DetailedInterestsSelector bind:checkedInterests={checkedInterests} />
                    {/if}
                </ExpandableItem>

                <ExpandableItem itemId="3" 
                                title="Компания" 
                                expanded={expandedItem[0] === "3"} 
                                on:toggle={onItemToggled} 
                                addSeparator={false}
                                >
                    <CompanyConfigurer />
                </ExpandableItem>
            </div>

            <div class="buttons">
                <button on:click|preventDefault={() => onReset()}>Сбросить всё</button>
                <button class="btn__raised" on:click|preventDefault={() => onApply()}>Применить</button>
            </div>
        </div>
    {/if}
</div>


<style>
    @media screen and (min-width: 500px) {
        .wrapper {
            width: 460px;
        }
    }

    .wrapper {
        background: #FAF2EF;
        max-width: 460px;
        padding: 15px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .status-bar {
        display: flex;
    }

    .btn-group {
        flex: 1;
        display: flex;
    }

    .expandable-block {
        overflow: hidden;
    }

    .buttons {
        display: flex;
        justify-content: center;
        gap: 14%;
    }

    .buttons button {
        width: 36%;
    }
</style>