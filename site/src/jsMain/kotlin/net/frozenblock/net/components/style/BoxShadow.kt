package net.frozenblock.net.components.style

import androidx.compose.runtime.Composable
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.graphics.Color
import com.varabyte.kobweb.compose.ui.modifiers.boxShadow
import com.varabyte.kobweb.silk.theme.colors.ColorMode
import org.jetbrains.compose.web.css.px

@Composable
fun Modifier.boxShadow(colorMode: ColorMode) = run {
    boxShadow(spreadRadius = 1.px, color = when (colorMode) {
        ColorMode.DARK -> Color.Companion.rgba(238, 238, 238, 0.2f)
        ColorMode.LIGHT -> Color.Companion.rgba(17, 17, 17, 0.2f)
    })
}