import assert from 'node:assert'
import _ from 'lodash'
import {configr} from '@watchmen/configr'
import debug from '@watchmen/debug'
import {withImages} from '@watchmen/containr'
import {stringify} from '@watchmen/helpr'
import {getUid, getContainerWork, initHostWork} from '@watchmen/containr/util'

const dbg = debug(import.meta.url)

async function main() {
  await initHostWork()

  const uid = await getUid()

  const images = configr.containr.images
  dbg('images=%o', images)

  await withImages({
    images,
    user: uid,
    async closure(withContainer) {
      const withOras = (args) => withContainer({...args, image: 'oras'})
      const withGcloud = (args) => withContainer({...args, image: 'gcloud'})

      const work = getContainerWork()

      const lsWork = await withGcloud({input: `ls -laR ${work}`})
      dbg('ls-work=%s', lsWork)

      await withOras({
        input: `oras pull --output ${work} ${configr.ociImage}`,
      })

      const which = await withGcloud({input: 'which gcloud'})
      dbg('which=%s', which)
      assert(which, 'gcloud binary should b on path')

      const ls = await withGcloud({input: 'ls -la'})
      dbg('ls=%s', stringify(ls))
      assert(ls, 'oci files should b found')

      // const {stdout, stderr} = await withGcloud({
      //   input: 'gcloud auth list',
      //   // don't throw on error here as this is expected to fail when not authenticated locally
      //   // so in this case just capture stdout and stderr and dump to console
      //   throwOnError: false,
      // })
      // dbg('out=%o, err=%o', stdout, stderr)
    },
  })
}

await main()
