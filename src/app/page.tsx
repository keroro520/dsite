'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const [posts] = useState([
    { id: 1, title: 'Post 1', content: 'This is the content for post 1.' },
    { id: 2, title: 'Post 2', content: 'This is the content for post 2.' },
    { id: 3, title: 'Post 3', content: 'This is the content for post 3.' },
  ]);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      <div>
        <h2>Posts</h2>
        {
            posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </div>
            ))
        }
      </div>
    </>
  )
}

export default App
