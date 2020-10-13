newItems = []

minItemIsTooSmall = (threshold) ->
  minItem = Math.min ...newItems
  threshold - minItem > 0

compensate = (threshold) ->
  console.log "---start (threshold:" + threshold + ")"
  minItem = Math.min ...newItems
  maxItem = Math.max ...newItems
  maxIndex = newItems.indexOf maxItem # 2 could be same max
  minIndex = newItems.indexOf minItem
  amount = threshold - minItem
  console.log "before:", [...newItems]
  newItems[maxIndex] = maxItem - amount
  newItems[minIndex] = minItem + amount
  console.log "maxIndex: ", maxIndex
  console.log "minIndex: ", minIndex
  console.log "amount", amount
  console.log "compensated: ", newItems

export fn =
  fit: (items, opt) ->
    { threshold, total, offset = 0 } = opt

    itemsTotal = items.reduce (a, b) -> a + b
    itemCount = items.length
    offsetTotal = offset * itemCount
    availableTotal = total - offsetTotal
    console.log "availableTotal:", availableTotal

    deltaTotal = availableTotal - itemsTotal
    if deltaTotal >= 0 then return

    delta = deltaTotal / itemCount
    console.log "delta per item:", delta

    newItems = items.map (item) -> item + delta
    console.log "newItemsTotal:", newItems.reduce (a, b) -> a + b

    if !threshold then return newItems

    minDelta = console.log "before comp:", newItems

    c = 0
    # while minItemIsTooSmall threshold
    while c < 8
      c = c + 1
      compensate threshold

    console.log "newItemsTotal:", newItems.reduce (a, b) -> a + b
    newItems
