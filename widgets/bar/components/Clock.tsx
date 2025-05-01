import { GLib, Variable } from "astal"

const Clock = () => {
  const time = Variable("").poll(1000, () => {
    const date = GLib.DateTime.new_now_local()
    return date.format('%A, %d de %B %H:%M')!
  })

  return (
    <label
      cssClasses={["Clock"]}
      label={time()}
      onDestroy={() => time.drop()}
    />
  )
}

export default Clock
