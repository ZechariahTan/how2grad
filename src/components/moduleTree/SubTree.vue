<template>
    <v-container fluid>
      <v-row class="subTreeModules pb-15" justify="center"  v-for="(hopList, hopIndex) in numHopsList" v-bind:key="hopIndex">
        <v-col v-for="mod in hopList" v-bind:key="mod.modCode">
          <SubTreeModule ref='subTreeMod'
            v-bind:moduleID='mod.modCode'
            v-on:pos-updated='updateEdges'
            v-on:lock-toggled="lockToggled"
            @mouseover="mouseOverEvents"
            @mouseleave="mouseLeaveEvents"
            :id="'SubTreeModule' + mod.modCode"
            :nodeData:='mod'
            :moduleData='moduleData'
            :modulePlan='modulePlan'
            :warnMap='warnMap'
            :viewSemColours="viewSemColours"
            :inHighlightedSem="checkHighlighted(mod.modCode)"/>
        </v-col>
      </v-row>
      <div v-for="edge in edgeList" v-bind:key="edge.index">
          <Edges ref='edgeRef' v-if="numHopsList.length > 0" v-bind:edge='edge' :key='componentKey'/>
      </div>
    </v-container>
</template>

<script>
// import Vue from 'vue'
import SubTreeModule from './SubTreeModule.vue'
import Edges from './Edges.vue'

export default {
  name: 'SubTree',
  components: {
    SubTreeModule,
    Edges
  },
  props: ['treeRoot', 'treeData', 'modulePrereqData', 'modList', 'moduleData', 'modulePlan', 'warnMap', 'viewSemColours', 'highlightedSem'],
  data () {
    return {
      stack: [],
      numHopsList: [],
      doneNodes: [],
      distanceMap: new Map(),
      edgeList: [],
      componentKey: 0,
      currLockedMod: ''
    }
  },
  methods: {
    findRoots () {
      this.treeData.forEach(modCode => {
        if (this.modulePrereqData.get(modCode) === undefined) {
          const modNode = {
            modCode: modCode,
            modCodeNoModi: this.stripModifier(modCode),
            numHops: 0,
            // x is a child of y means x is a prerequisite for y
            childrenList: []
          }
          this.stack.push(modNode)
          if (this.numHopsList[0] === undefined) {
            this.numHopsList.push([])
          }
          this.numHopsList[0].push(modNode)
        }
      })
    },
    genGraphDFS () {
      while (this.stack.length !== 0) {
        const currModNode = this.stack.pop()
        const tempChildList = []
        // iterate through prereqData to find mods that require currModNode as a prereq
        this.modulePrereqData.forEach((modPrereqs, modCode) => {
          // remove modifiers
          if (modPrereqs.has(currModNode.modCode) || modPrereqs.has(currModNode.modCodeNoModi)) {
            // create new child node. x is a child of y means y is a prereq for x
            const modNode = {
              modCode: modCode,
              modCodeNoModi: this.stripModifier(modCode),
              numHops: currModNode.numHops + 1,
              childrenList: []
            }
            this.edgeList.push([modCode, currModNode.modCode, 'defaultEdge', false])
            const numHops = modNode.numHops
            // check if child has been visited before
            if (this.distanceMap.get(modCode) === undefined) {
              this.distanceMap.set(modCode, numHops)
              this.stack.push(modNode)
              tempChildList.push(modNode)
              currModNode.childrenList.push(modNode)
              while (this.numHopsList[numHops] === undefined) {
                this.numHopsList.push([])
              }
              this.numHopsList[numHops].push(modNode)
              // if visited before, is current distance greater than previous distance
            } else {
              currModNode.childrenList.push(modNode)
              if (numHops >= this.distanceMap.get(modCode)) {
                this.stack.forEach(mod => {
                  if (mod.modCode === modCode) {
                    mod.numHops = numHops
                  }
                })
                const oldDList = this.numHopsList[this.distanceMap.get(modCode)]
                const index = oldDList.indexOf(oldDList.find(mod => mod.modCode === modCode))
                this.numHopsList[this.distanceMap.get(modCode)].splice(index, 1)
                this.distanceMap.set(modCode, numHops)
                while (this.numHopsList[numHops] === undefined) {
                  this.numHopsList.push([])
                }
                this.numHopsList[numHops].push(modNode)
              }
            }
          }
        })
        this.doneNodes.push(currModNode)
      }
    },
    numHopsListOrdering () {
      for (let hop = 1; hop < this.numHopsList.length; hop++) {
        const upperList = this.numHopsList[hop]
        const lowerList = this.numHopsList[hop - 1]
        let swapIndex = 0
        for (let LIndex = 0; LIndex < lowerList.length; LIndex++) {
          // bottom mod
          for (let UIndex = 0; UIndex < upperList.length; UIndex++) {
            // upper mod
            let isLinked = false
            lowerList[LIndex].childrenList.forEach(modNode => {
              if (modNode.modCode === upperList[UIndex].modCode) {
                isLinked = true
              }
            })

            if (isLinked) {
              if (swapIndex !== UIndex) {
                const temp = upperList[swapIndex]
                upperList[swapIndex] = upperList[UIndex]
                upperList[UIndex] = temp
              }
              if (swapIndex < upperList.length - 1) {
                swapIndex += 1
              }
            }
          }
        }
      }
    },
    flipNumHopsList () {
      const temp = []
      while (this.numHopsList.length > 0) {
        temp.push(this.numHopsList.pop())
      }
      this.numHopsList = temp
    },
    stripModifier (modCode) {
      if (!modCode.substr(-1).match(/\d/)) {
        return modCode.match(/\w+\d\d\d\d/)[0]
      } else {
        return modCode
      }
    },
    updateEdges () {
      if (this.edgeList.length > 0) {
        this.$refs.edgeRef.forEach(edge => edge.updateEdge())
      }
    },
    onResize () {
      this.$refs.subTreeMod.forEach(subTreeMod => subTreeMod.updatePos())
      this.updateEdges()
    },
    mouseOverEvents (hoveredModCode) {
      this.$emit('mouseOverMod', hoveredModCode)
      this.colourEdges(hoveredModCode)
    },
    mouseLeaveEvents (hoveredModCode) {
      this.$emit('mouseLeaveMod', hoveredModCode)
      this.revertEdges(hoveredModCode)
    },
    // can improve effeciency
    colourEdges (hoveredModCode) {
      this.edgeList.forEach(edge => {
        const hoveredIndex = edge.findIndex(v => v === hoveredModCode)
        if (hoveredIndex !== -1) {
          const other = 1 - hoveredIndex
          const otherModCard = document.getElementById('SubTreeModule' + edge[other]).__vue__
          otherModCard.related = true
          if (this.modulePrereqData.get(edge[hoveredIndex]) !== undefined && this.modulePrereqData.get(edge[hoveredIndex]).has(this.stripModifier(edge[other]))) {
            edge[2] = 'redEdge'
            if (!otherModCard.frozen) {
              otherModCard.changeColour('red')
            }
          } else if (this.modulePrereqData.get(edge[other]) !== undefined && this.modulePrereqData.get(edge[other]).has(this.stripModifier(hoveredModCode))) {
            edge[2] = 'greenEdge'
            if (!otherModCard.frozen) {
              otherModCard.changeColour('green')
            }
          }
        }
      })
      this.updateEdges()
    },
    revertEdges (hoveredModCode) {
      this.edgeList.forEach(edge => {
        const hoveredIndex = edge.findIndex(v => v === hoveredModCode)
        if (hoveredIndex !== -1) {
          edge[2] = 'defaultEdge'
          const other = 1 - hoveredIndex
          const otherModCard = document.getElementById('SubTreeModule' + edge[other]).__vue__
          otherModCard.related = false
          if (!document.getElementById('SubTreeModule' + edge[other]).__vue__.frozen) {
            otherModCard.changeColour('default')
          }
        }
      })
      this.updateEdges()
    },
    lockToggled (lockedMod) {
      if (this.currLockedMod !== '' && this.currLockedMod !== lockedMod) {
        document.getElementById('SubTreeModule' + this.currLockedMod).__vue__.locked = false
        this.unfreezeRelated(this.currLockedMod)
      }
      if (document.getElementById('SubTreeModule' + lockedMod).__vue__.locked) {
        this.unfreezeRelated(lockedMod)
        this.currLockedMod = ''
      } else {
        this.freezeRelated(lockedMod)
        this.currLockedMod = lockedMod
      }
      document.getElementById('SubTreeModule' + lockedMod).__vue__.locked = !document.getElementById('SubTreeModule' + lockedMod).__vue__.locked
    },
    freezeRelated (lockedMod) {
      this.colourEdges(lockedMod)
      this.edgeList.forEach(edge => {
        const lockedIndex = edge.findIndex(v => v === lockedMod)
        if (lockedIndex !== -1) {
          edge[3] = true
          const other = 1 - lockedIndex
          const otherModCard = document.getElementById('SubTreeModule' + edge[other]).__vue__
          otherModCard.frozen = true
        }
      })
      this.updateEdges()
    },
    unfreezeRelated (lockedMod) {
      this.edgeList.forEach(edge => {
        const lockedIndex = edge.findIndex(v => v === lockedMod)
        if (lockedIndex !== -1) {
          edge[3] = false
          const other = 1 - lockedIndex
          const otherModCard = document.getElementById('SubTreeModule' + edge[other]).__vue__
          otherModCard.frozen = false
          otherModCard.changeColour('default')
        }
      })
      this.updateEdges()
    },
    checkHighlighted (modCode) {
      for (let i = 0; i < this.highlightedSem.length; i++) {
        if(this.highlightedSem[i] && this.modulePlan[~~(i/2)][i%2].includes(modCode)) {
          return true
        }
      }
      return false
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.findRoots()
    this.genGraphDFS()
    this.numHopsListOrdering()
    this.flipNumHopsList()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped>
 .subTreeModules{
   z-index: 2;
   position: relative
 }
</style>
