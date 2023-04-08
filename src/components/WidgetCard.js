import React from 'react'
import "../components_css/WidgetCard.css"
import WidgetEntry from './WidgetEntry'

function WidgetCard({ title, similar, featured, newRelease }) {
  // we are importing all the three but we will see what is present and what not 
  // console.log(similar, featured, newRelease);
  // console.log(newRelease);
  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {
        similar ? similar.map((artist) => {
          return <WidgetEntry title={artist?.name} subtitle={artist?.followers?.total+" Followers"} image={artist?.images[2]?.url} />
        })
          :
          featured ? featured.map((playlist) => {
            return (
              <WidgetEntry title={playlist?.name} subtitle={playlist?.tracks?.total+" Songs"} image={playlist?.images[0]?.url} />
            )
          })
            :
            newRelease ? newRelease.map((album) => {
              return (
                <WidgetEntry title={album?.name} subtitle={album?.artists[0]?.name} image={album?.images[2]?.url} />
              )
            })
              : null
      }
    </div>
  )
}

export default WidgetCard
