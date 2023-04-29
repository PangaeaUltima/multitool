<template>
  <div ref="layout" id="layout" class="cursor-follower">
    <div
      ref="food"
      class="follower-food"
      :style="{ left: `${foodPositionX}px`, top: `${foodPositionY}px` }"
    />
    <div
      id="follower"
      ref="follower"
      class="follower bg-yellow"
      :style="{ width: `${followerSize}px`, height: `${followerSize}px`, left: `${followerPositionX}px`, top: `${followerPositionY}px` }"
    >
      <div class="follower-mouth" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, computed, onUnmounted} from 'vue'
import { useAppStore } from '@/store/app'

export default defineComponent({
  name: 'AppCursorFollower',
  setup() {
    const appStore = useAppStore()
    const followerSize: number = 16
    let followerPositionX: Ref<number> = ref(60)
    let followerPositionY: Ref<number> = ref(60)
    let x: Ref<number> = ref(0)
    let y: Ref<number> = ref(0)
    let followerCenterX: Ref<number> = ref(0)
    let followerCenterY: Ref<number> = ref(0)
    let directionX: Ref<number> = ref(0)
    let directionY: Ref<number> = ref(0)
    let runInterval = ref()
    let updatePositionInterval = ref()
    let foodEatingInterval = ref()
    const layout = ref()
    const follower = ref()
    let food = ref()
    let foodPositionX: Ref<number> = ref(0)
    let foodPositionY: Ref<number> = ref(0)

    onMounted(() => {
      calcFoodPosition()
      runFollower()
      updatePositionData()
    })

    onUnmounted(() => {
      clearInterval(runInterval.value)
      clearInterval(updatePositionInterval.value)
      clearInterval(foodEatingInterval.value)
    })

    function calcFoodPosition() {
      const food = document.createElement('div')
      food.classList.add('follower-food')

      foodPositionX.value = Math.random() * window.innerWidth
      foodPositionY.value = Math.random() * window.innerHeight

      checkFoodMustBeEaten()
    }

    function checkFoodMustBeEaten() {
      food.value = document.getElementsByClassName('follower-food')

      foodEatingInterval.value = setInterval(() => {
        const rectFollower = follower.value.getBoundingClientRect()
        const rectFood = food.value.getBoundingClientRect()

        const overlap = !(
          rectFollower.right < rectFood.left ||
          rectFollower.left > rectFood.right ||
          rectFollower.bottom < rectFood.top ||
          rectFollower.top > rectFood.bottom
        )

        if (overlap) {
          eatFood()
        }
      })
    }



    function eatFood() {
      appStore.setEatenFoodCounter(appStore.eatenFoodCounter + 1)
      clearInterval(foodEatingInterval.value)
      calcFoodPosition()
    }

    function listenMousePosition() {
      window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e

        x.value = clientX
        y.value = clientY
      })
    }

    function runFollower() {
      listenMousePosition()

      followerPositionX.value = window.innerWidth * 0.9
      followerPositionY.value = window.innerHeight * 0.5

      runInterval.value = setInterval(() => {
        const { offsetLeft, offsetTop } = follower.value
        followerCenterX.value = offsetLeft + followerSize / 2
        followerCenterY.value = offsetTop + followerSize / 2
        const followerGotMouse: boolean = followerCenterX.value === x.value && followerCenterY.value === y.value

        if (!followerGotMouse) {
          if (followerCenterX !== x)
            followerPositionX.value = Math.round(+followerPositionX.value + directionX.value)
          if (followerCenterY !== y)
            followerPositionY.value = Math.round(+followerPositionY.value + directionY.value)
        }
      }, 1)
    }

    function updatePositionData() {
      updatePositionInterval.value = setInterval(() => {
        const { offsetLeft, offsetTop } = follower.value

        followerCenterX.value = offsetLeft + followerSize / 2
        followerCenterY.value = offsetTop + followerSize / 2
        const { mouseTop, mouseLeft } = {
          mouseTop: y.value < followerCenterY.value,
          mouseLeft: x.value < followerCenterX.value,
        }

        directionX.value = mouseLeft ? -1 : 1
        directionY.value = mouseTop ? -1 : 1
      }, 1)
    }

    return {
      food,
      follower,
      followerSize,
      followerPositionX,
      followerPositionY,
      foodPositionX,
      foodPositionY,
      layout,
    }
  }
})
</script>

<style lang="scss" scoped>
.cursor-follower {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;

  .follower {
    z-index: 9;
    position: absolute;
    border-radius: 50%;
    right: 10%;
    top: 50%;
    overflow: hidden;

    .follower-mouth {
      position: absolute;
      width: 100%;
      height: 100%;
      background: $primary-background;
      clip-path: polygon(100% 80%, 44% 48%, 100% 21%);
      animation-name: mouthAnimation;
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
    }
  }
  
  .follower-food {
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: red;
  }

  @keyframes mouthAnimation {
    0% {
      clip-path: polygon(100% 80%, 44% 48%, 100% 21%);
    }
    50% {
      clip-path: polygon(100% 50%, 44% 48%, 100% 50%);
    }
    100% {
      clip-path: polygon(100% 80%, 44% 48%, 100% 21%);
    }
  }
}
</style>