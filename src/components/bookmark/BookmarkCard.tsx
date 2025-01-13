"use client";

import Image from 'next/image'
import { useState } from 'react'
import { Folder } from 'lucide-react'
import Avatar from 'react-avatar';
// const getRandomColor = () => '#' + Math.random().toString(16).slice(2, 8)
function getRandomColor() {
  // 随机色相（0 到 360）
  const h = Math.floor(Math.random() * 360);

  // 限制饱和度和亮度（避免过于鲜艳或过暗）
  const s = Math.floor(Math.random() * 30) + 50; // 饱和度 50% 到 80%
  const l = Math.floor(Math.random() * 30) + 50; // 亮度 50% 到 80%

  return `hsl(${h}, ${s}%, ${l}%)`;
}


interface BookmarkCardProps {
  title: string
  url: string
  icon?: string
  description?: string
  isFeatured?: boolean
  collection?: {
    name: string
    slug: string
  }
  folder?: {
    name: string
  }
}

export function BookmarkCard({
  title,
  url,
  icon,
  description,
  isFeatured = false,
  collection,
  folder
}: BookmarkCardProps) {
  const [imageError, setImageError] = useState(false)
  const defaultIcon = '/assets/default-icon.svg'

  // 清理 URL 显示，移除 http(s) 和尾部斜杠
  const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div
      style={{ transition: '0.15s' }}
      onClick={() => window.open(url, '_blank')}
      className={`
        cursor-pointer flex items-center transition-shadow p-4 
        bg-card/50 dark:bg-gray-900 border border-[#eaebf3]
        dark:ring-gray-800 rounded-2xl hover:-translate-y-1
        hover:scale-103 hover:shadow-suspension 
        dark:hover:bg-gray-800
        ${isFeatured ? 'border-2 border-blue-500' : ''}
      `}
    >
      <div className="relative w-8 h-8 mr-4 flex-shrink-0">
        {/* <Image
          src={imageError ? defaultIcon : (icon || defaultIcon)}
          alt={title}
          fill
          className="rounded-full object-cover"
          onError={() => setImageError(true)}
          priority={isFeatured}
        /> */}
        {imageError ? (
          <Avatar
            name={title}
            size="100%"
            round={true}
            className="flex items-center"
            color={getRandomColor()}
            maxInitials={1}
          />
        ) : (
          <Image
            src={icon || defaultIcon}
            alt={title}
            fill
            className="rounded-full object-cover"
            onError={() => setImageError(true)}
            priority={isFeatured}
          />
        )}
      </div>

      <div className="flex flex-col overflow-hidden">
        <h2 className="text-sm font-medium mb-1 truncate dark:text-gray-400">
          {title}
        </h2>

        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-600 mb-1 line-clamp-2">
            {description}
          </p>
        )}

        <p className="text-xs text-gray-400 dark:text-gray-600 dark:hover:text-gray-400 truncate">
          {cleanUrl}
        </p>

        {(collection || folder) && (
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            {collection && (
              <span className="inline-flex items-center">
                {collection.name}
              </span>
            )}
            {folder && (
              <>
                <span className="mx-1">/</span>
                <span className="inline-flex items-center">
                  <Folder className="w-3 h-3 mr-1" />
                  {folder.name}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
