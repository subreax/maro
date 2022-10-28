<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let toggled = false;
    export let className = "";
    export let style = "";

    function onClick(e) {
        e.preventDefault(); 
        toggled = !toggled;

        dispatch("click", {toggle: toggled});
    }

</script>

<button 
    class="btn__toggle {className}" 
    class:btn__toggle--active={toggled} 
    style={style}
    on:click={onClick}>
    
    <slot></slot>

</button>