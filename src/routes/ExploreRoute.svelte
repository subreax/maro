<script>
    import { CodeInputStyle } from "../components/CodeInputStyle";
    import CodeInputComponent from "../components/CodeInputComponent.svelte";
    import PathTuningComponent from "../components/PathTuningComponent.svelte";
    import ChipGroup from "../components/ChipGroup.svelte";
    import Filter from "../components/Filter.svelte";
    import MapMenu from "../components/MapMenu.svelte";
    
    export let location;

    let codeInputStyle = CodeInputStyle.NONE;

    function onCode(code) {
        if (code === "123456") {
            codeInputStyle = CodeInputStyle.CORRECT;
        } else {
            codeInputStyle = CodeInputStyle.WRONG;
        }
    }

</script>


<MapMenu className="map-menu" />
