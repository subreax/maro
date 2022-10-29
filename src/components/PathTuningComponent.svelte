<script>
    import ToggleButton from "./ToggleButton.svelte";
    import ExpandableList from "./ExpandableList.svelte";
    import { slide } from "svelte/transition"


    export let data = [
        {
            id: 1,
            title: "Пожелания",
            content: "<p>Лорем ипсум долор сит амет, cонсеcтетур адиписcинг елит, сед до еиусмод темпор инcидидунт ут лаборе ет долоре магна алиқуа. Aенеан вел елит сcелерисқуе маурис пеллентесқуе.</p>"
        }, 
        {
            id: 2,
            title: "Критерии времяпрепровождения",
            content: "<p>Еним праесент елементум фаcилисис лео. Урна молестие ат елементум еу фаcилисис сед. Витае cонгуе маурис рҳонcус аенеан вел елит сcелерисқуе маурис. Масса еним неc дуи нунc маттис еним ут. Етиам дигниссим диам қуис еним лобортис сcелерисқуе ферментум.</p>"
        },
        {
            id: 3,
            title: "Характеристика посетителей",
            content: "<p>Теллус ид интердум велит лаореет ид донеc. Ест сит амет фаcилисис магна етиам темпор. Aмет ест плаcерат ин егестас ерат. Малесуада бибендум арcу витае елементум cурабитур витае. Рисус претиум қуам вулпутате дигниссим. Ин нибҳ маурис cурсус маттис молестие а иаcулис. </p>"
        }
    ];

    let modeSelected = 0;
    let expanded = false;

    function contentToggled(val) {
        expanded = val;
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
        <ExpandableList style="margin: 10px 0; background: #fff; border-radius: 20px" {data}/>
        <div class="buttons">
            <button>Сбросить всё</button>
            <button class="btn__raised">Применить</button>
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