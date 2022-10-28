<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let toggled = false;
    export let toggleLocked = false;
    export let className = "";
    export let style = "";

    function onClick(e) {
        e.preventDefault(); 
        
        if (!toggleLocked) {
            toggled = !toggled;
            dispatch("toggle", {toggle: toggled});
        }
    }

</script>

<button 
    class="btn__toggle {className}" 
    class:btn__toggle--active={toggled} 
    style={style}
    on:click={onClick}>
    
    <slot></slot>

</button>